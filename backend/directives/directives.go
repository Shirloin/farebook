package directives

import (
	"context"

	"github.com/99designs/gqlgen/graphql"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func Auth(ctx context.Context, obj interface{}, next graphql.Resolver) (interface{}, error) {
	token := ctx.Value("TokenValue")
	if token == nil {
		return nil, &gqlerror.Error{
			Message: "Please Login",
		}
	}
	ctx = context.WithValue(ctx, "UserID", token)
	return next(ctx)
}
