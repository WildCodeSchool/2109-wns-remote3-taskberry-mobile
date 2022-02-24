interface Ticket {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  finishedAt?: string;
  projectId: number;
  statusId: number;
  assigneeId: number;
}

interface ProjectTicketsData {
  getProjectTickets: Ticket[] | [];
}

interface ProjectTicketsVariables {
  projectId: number;
}
