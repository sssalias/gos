import Comment from 'src/entities/appeal/model/Comment'

interface Appeal {
    photoId?: string | null
    ownerRole: string
    number: number
    status: string
    ownerEmail: string
    body: string
    id: string
    comments: Comment[]
}

export default Appeal