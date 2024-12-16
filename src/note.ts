import Elysia, { error, t } from 'elysia';
type note = {
  id: number;
  content: string;
};

class Note {
  constructor(
    private incrementId: number = 0,
    private datas: note[] = [],
  ) {}

  addNote(content: string) {
    const note = { id: this.incrementId++, content: content };
    this.datas.push(note);
    return note;
  }

  getNote(id: number) {
    for (let i = 0; i < this.datas.length; i++) {
      if (this.datas[i].id === id) return this.datas[i];
    }

    return null;
  }

  getAllNote() {
    return this.datas;
  }

  updateNote(id: number, newContent: string) {
    this.datas = this.datas.map((note) => {
      if (note.id === id) {
        return { ...note, content: newContent };
      }
      return note;
    });
  }

  deleteNote(id: number) {
    this.datas = this.datas
      .map((note) => {
        if (note.id === id) {
          return undefined;
        }
        return note;
      })
      .filter((note) => !!note);
  }
}

export const note = new Elysia()
  .decorate('note', new Note())
  .post(
    '/note',
    ({ note, body, set }) => {
      set.status = 201;
      return note.addNote(body.content);
    },
    {
      body: t.Object({ content: t.String() }),
    },
  )
  .get(
    '/note/:id',
    ({ note, params: { id } }) => {
      return note.getNote(id) ?? error(404);
    },
    {
      params: t.Object({ id: t.Number() }),
    },
  )
  .get('/notes', ({ note }) => note.getAllNote())
  .put(
    '/note/:id',
    ({ note, params, body }) => {
      note.updateNote(params.id, body.content);
    },
    {
      params: t.Object({ id: t.Number() }),
      body: t.Object({ content: t.String() }),
    },
  )
  .delete(
    '/note/:id',
    ({ note, params }) => {
      note.deleteNote(params.id);
    },
    {
      params: t.Object({ id: t.Number() }),
    },
  );
