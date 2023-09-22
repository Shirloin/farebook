import { User, UserConstructor } from "./User"

export interface Story{
    id: string
    content: string
    user: User
    createdAt: string
    privacy: string
}

export interface StoryProps{
    story: Story
}

export interface Stories{
    stories: Story[]
}

export interface StoriesProps{
    stories: Stories
}

export const StoryConstructor = ()=>{
    const story:Story = {
        id: "",
        content: "",
        user: UserConstructor(),
        createdAt: "",
        privacy: "Public"
    }
    return story
}