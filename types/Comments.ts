interface Comment {
  id: number;
  description: string;
  createdAt: Date;
  ticketId: number;
  userId: number;
}

interface CommentsTicketData {
  getTicketComments: Comment[] | [];
}

interface CommentsTicketVariables {
  ticketId: number;
}
