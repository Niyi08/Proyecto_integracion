const request = require('supertest');
const app = require('../app'); // Importa tu archivo app.js

describe('Task API', () => {
  it('should return an empty task list', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should add a new task', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ task: 'Test Task' });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Task added!');
  });

  it('should return 400 if no task is provided', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('No task provided');
  });

  it('should delete a task', async () => {
    // Primero, añade una tarea
    await request(app)
      .post('/tasks')
      .send({ task: 'Test Task' });

    // Luego, elimina la tarea
    const response = await request(app)
      .delete('/tasks/1');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Task deleted!');
  });
});
