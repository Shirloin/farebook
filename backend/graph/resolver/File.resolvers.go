package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.36

import (
	"context"

	"github.com/shirloin/backend/graph"
	"github.com/shirloin/backend/graph/model"
)

// Post is the resolver for the post field.
func (r *fileResolver) Post(ctx context.Context, obj *model.File) (*model.Post, error) {
	var post *model.Post
	return post, r.DB.Find(&post, "id = ?", obj.ID).Error
}

// File returns graph.FileResolver implementation.
func (r *Resolver) File() graph.FileResolver { return &fileResolver{r} }

type fileResolver struct{ *Resolver }