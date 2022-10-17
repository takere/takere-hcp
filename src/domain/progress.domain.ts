import Board from "./board.domain";
import User from "./user.domain";

interface Progress {
  patient: User,
  flow: {
    id: string,
    name: string,
    description: string,
    completed?: Board[],
    ongoing?: Board,
    late?: Board
  }
}

export default Progress;
