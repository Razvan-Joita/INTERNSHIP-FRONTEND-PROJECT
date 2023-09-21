import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PositionModel } from '../../company/models/position.model';

@Injectable()
export class PositionService {
  private baseUrl = 'api/positions';

  constructor(private http: HttpClient) {}

  addPosition(positionData: PositionModel): Observable<PositionModel> {
    return this.http.post<PositionModel>(this.baseUrl, positionData);
  }

  getPosition(positionId: number): Observable<PositionModel> {
    return this.http.get<PositionModel>(`${this.baseUrl}/${positionId}`);
  }

  updatePosition(
    positionId: number,
    updatedData: PositionModel,
  ): Observable<PositionModel> {
    return this.http.put<PositionModel>(
      `${this.baseUrl}/${positionId}`,
      updatedData,
    );
  }

  deletePosition(positionId: number): Observable<number> {
    return this.http.delete<number>(`${this.baseUrl}/${positionId}`);
  }
  getAllPositions(): Observable<PositionModel[]> {
    const mockPositions: PositionModel[] = [
      {
        id: 1,
        name: 'Position one',
      },
      {
        id: 2,
        name: 'Position two',
      },
      {
        id: 3,
        name: 'Position three',
      },
      // Add more teams here as needed
    ];
    //return this.http.get<TeamModel[]>(`${this.baseUrl}`);
    return of(mockPositions);
  }
}
