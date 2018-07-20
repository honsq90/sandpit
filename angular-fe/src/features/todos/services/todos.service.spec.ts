import { TestBed } from '@angular/core/testing';

import { TodosService } from './todos.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { configureTestSuite } from '../../../config/setupJest';

describe('TodosService', () => {
  const todos = [{ text: 'blah' }];
  const httpMock = {
    get: jest.fn(),
  };

  let service: TodosService;

  configureTestSuite();

  beforeAll((done) => (async () => {
    TestBed.configureTestingModule({
      providers: [
        TodosService,
        { provide: HttpClient, useValue: httpMock },
      ],
    });

    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  beforeEach(() => {
    service = TestBed.get(TodosService);
  });

  it('should call the http client with the right URL and pipe the correct results', (done) => {
    const streamMock = of(todos);
    httpMock.get.mockReturnValue(streamMock);
    service.getTodos().subscribe((results) => {
      expect(results).toEqual(todos);
      done();
    });
    expect(httpMock.get).toBeCalledWith('http://localhost:3000/todos');

  });

  it('should catch error and return empty result', (done) => {
    const errorMock = throwError('error!');
    httpMock.get.mockReturnValue(errorMock);
    console.error = jest.fn();
    service.getTodos().subscribe((results) => {
      expect(results).toEqual([]);
      expect(console.error).toBeCalledWith('getTodos', 'error!');
      done();
    });
    expect(httpMock.get).toBeCalledWith('http://localhost:3000/todos');

  });
});
