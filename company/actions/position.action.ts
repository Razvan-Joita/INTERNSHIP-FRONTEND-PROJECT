import { PositionModel } from '../models/position.model';

export class GetPositions {
  static readonly type = '[Positions] Get';

  constructor() {}
}

export class GetPosition {
  static readonly type = '[Positions] Get';

  constructor(public id: number) {}

}

export class AddPosition {
  static readonly type = '[Positions] Add';

  constructor(public position: PositionModel) {}

}

export class UpdatePosition {
  static readonly type = '[Positions] Update';

  constructor(public position: PositionModel, public id: number) {}

}

export class DeletePosition {
  static readonly type = '[Positions] Delete';

  constructor(public id: number) {
  }

}
