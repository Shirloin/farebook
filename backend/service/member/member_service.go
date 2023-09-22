package member

import (
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/shirloin/backend/graph/model"
	"github.com/shirloin/backend/service"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

// User is the resolver for the user field.
func User(ctx context.Context, obj *model.Member) (*model.User, error) {
	var user *model.User
	return user, service.DB.Find(&user, "id = ?", obj.UserID).Error
}

// Group is the resolver for the group field.
func Group(ctx context.Context, obj *model.Member) (*model.Group, error) {
	var group *model.Group
	return group, service.DB.Find(&group, "id = ?", obj.GroupID).Error
}

// JoinGroup is the resolver for the joinGroup field.
func JoinGroup(ctx context.Context, inputMember model.NewMember) (*model.Member, error) {
	if IsRequested(inputMember.UserID, inputMember.GroupID) {
		return nil, &gqlerror.Error{
			Message: "This user has requested",
		}
	}
	member := &model.Member{
		ID:        uuid.NewString(),
		UserID:    inputMember.UserID,
		GroupID:   inputMember.GroupID,
		JoinedAt:  time.Now(),
		Role:      inputMember.Role,
		Confirmed: inputMember.Confirmed,
	}
	if err := service.DB.Save(&member).Error; err != nil {
		return nil, err
	}
	if inputMember.Role == "Member" {
		user, err := service.GetUser(ctx, inputMember.UserID)
		if err != nil {
			return nil, err
		}
		group, err := service.GetGroup(ctx, inputMember.GroupID)
		if err != nil {
			return nil, err
		}
		admin, err := GetAdmin(ctx, inputMember.GroupID)
		if err != nil {
			return nil, err
		}
		for _, a := range admin {
			newNotif := &model.NewNotification{
				SenderID:   inputMember.UserID,
				ReceiverID: &a.UserID,
				Message:    user.Firstname + " " + user.Lastname + " has requested to join " + group.Name,
				Type:       "Join Group",
				Content:    &member.ID,
			}
			_, err = service.CreateNotification(ctx, *newNotif)
			if err != nil {
				return nil, err
			}
		}
	}
	return member, nil
}

// LeaveGroup is the resolver for the leaveGroup field.
func LeaveGroup(ctx context.Context, groupID string, userID string) (*model.Member, error) {
	var member *model.Member
	if err := service.DB.First(&member, "group_id = ? AND user_id = ?", groupID, userID).Error; err != nil {
		return nil, err
	}
	admin, err := GetAdmin(ctx, groupID)
	if err != nil {
		return nil, err
	}
	members, err := GetMember(ctx, groupID)
	if err != nil {
		return nil, err
	}

	if len(admin) == 1 && len(members) == 0 {
		_, err := service.DeleteGroup(ctx, member.GroupID)
		if err != nil {
			return nil, err
		}
		err = service.DB.Delete(&member).Error
		if err != nil {
			return nil, err
		}
		return member, nil
	}
	if member.Role == "Admin" && len(admin) == 1 && len(members) > 0 {
		return nil, &gqlerror.Error{
			Message: "Only 1 admin left, cannot leave group",
		}
	}
	return member, service.DB.Delete(&member).Error
}

// GetMember is the resolver for the getMember field.
func GetMember(ctx context.Context, id string) ([]*model.Member, error) {
	var member []*model.Member
	return member, service.DB.Find(&member, "group_id = ? AND role = ?", id, "Member").Error
}

// GetAdmin is the resolver for the getAdmin field.
func GetAdmin(ctx context.Context, id string) ([]*model.Member, error) {
	var member []*model.Member
	return member, service.DB.Find(&member, "group_id = ? AND role = ?", id, "Admin").Error
}

// InviteMember is the resolver for the inviteMember field.
func InviteMember(ctx context.Context, groupID string, userID string, memberID string) (*model.Member, error) {
	member := &model.Member{
		ID:        uuid.NewString(),
		UserID:    userID,
		GroupID:   groupID,
		Role:      "Member",
		JoinedAt:  time.Now(),
		Confirmed: false,
	}
	group, err := service.GetGroup(ctx, groupID)
	if err != nil {
		return nil, err
	}
	user, err := service.GetUser(ctx, userID)
	if err != nil {
		return nil, err
	}
	newNotif := &model.NewNotification{
		SenderID:   memberID,
		ReceiverID: &userID,
		Message:    "You have been invited by " + user.Firstname + " " + user.Lastname + " to " + group.Name,
		Type:       "Group Invite",
		Content:    &member.ID,
	}
	_, err = service.CreateNotification(ctx, *newNotif)
	if err != nil {
		return nil, err
	}
	return member, service.DB.Save(&member).Error
}

// ConfirmMember is the resolver for the confirmMember field.
func ConfirmMember(ctx context.Context, id string) (*model.Member, error) {
	var member *model.Member
	if err := service.DB.Find(&member, "id = ?", id).Error; err != nil {
		return nil, err
	}
	member.Confirmed = true
	return member, service.DB.Save(&member).Error
}

// IsMember is the resolver for the isMember field.
func IsMember(ctx context.Context, groupID string, userID string) (string, error) {
	var member model.Member
	err := service.DB.Where("user_id = ? AND group_id = ?", userID, groupID).First(&member).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return "Not Found", nil
		}
	}
	if !member.Confirmed {
		return "False", nil
	}
	return "True", nil
}

func DeleteMember(ctx context.Context, id string) (*model.Member, error) {
	var member *model.Member
	if err := service.DB.Find(&member, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return member, service.DB.Where("id = ?", id).Delete(&member).Error
}

// IsMemberByID is the resolver for the isMemberById field.
func IsMemberByID(ctx context.Context, id string) (string, error) {
	var member *model.Member
	err := service.DB.Where("id = ?", id).First(&member).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return "Not Found", nil
		}
	}
	if !member.Confirmed {
		return "False", nil
	}
	return "True", nil
}

func GetNonMemberFriend(ctx context.Context, id string, groupID string) ([]*model.User, error) {
	var users []*model.User
	friends, err := service.GetFriend(ctx, id)
	if err != nil {
		return nil, err
	}
	for _, f := range friends {
		res, err := IsMember(ctx, groupID, f.ID)
		if err != nil {
			return nil, err
		}
		fmt.Println(res)
		if res == "Not Found" {
			users = append(users, f)
		}
	}
	return users, nil
}

func IsRequested(userID string, groupID string) bool {
	var member model.Member
	err := service.DB.Where("user_id = ? AND group_id = ? AND confirmed = ?", userID, groupID, false).First(&member).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return false
		}
		return false
	}
	return true
}
