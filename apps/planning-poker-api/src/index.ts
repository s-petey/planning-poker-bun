import { Elysia, t } from 'elysia';
import {
  addOrUpdateDisplay,
  getAllRooms,
  getRoomById,
  registerOrJoinRoom,
  resetRoomCards,
  updateDisplayCardValue,
  updateRoom,
} from './methods/socketActions';
import { roomSocketModel } from './shared';

const SocketActionTypes = {
  ADD_DISPLAY: 'ADD_DISPLAY',
  RESET_ROOM_CARDS: 'RESET_ROOM_CARDS',
  SHOW_VOTES: 'SHOW_VOTES',
  UPDATE_DISPLAY: 'UPDATE_DISPLAY',
  UPDATE_LABEL: 'UPDATE_LABEL',
} as const;

const displaySocketDetails = t.Object({
  roomId: t.String(),
  displayId: t.String(),
  cardValue: t.Number(),
});

const SocketActions = t.Union([
  t.Object({
    type: t.Literal(SocketActionTypes.ADD_DISPLAY),
    value: displaySocketDetails,
  }),
  t.Object({
    type: t.Literal(SocketActionTypes.RESET_ROOM_CARDS),
    value: t.Boolean(),
  }),
  t.Object({
    type: t.Literal(SocketActionTypes.SHOW_VOTES),
    value: t.Boolean(),
  }),
  t.Object({
    type: t.Literal(SocketActionTypes.UPDATE_DISPLAY),
    value: displaySocketDetails,
  }),
  t.Object({
    type: t.Literal(SocketActionTypes.UPDATE_LABEL),
    value: t.String(),
  }),
]);

const app = new Elysia()
  .model({
    roomSocket: roomSocketModel,
  })
  // Rooms
  .get('/api/rooms', () => {
    return getAllRooms();
  })
  .guard(
    {
      body: t.Object({
        label: t.String(),
        name: t.String(),
        showVotes: t.Boolean(),
      }),
    },
    (app) =>
      app
        .post('/api/rooms', ({ body }) => {
          const { label, name, showVotes } = body;

          const updatedRoom = registerOrJoinRoom({
            label,
            name,
            showVotes,
          });

          return updatedRoom;
        })
        .patch('/api/rooms/:id', ({ params: { id }, body }) => {
          const { label, name, showVotes } = body;

          return updateRoom(id, {
            id,
            label,
            name,
            showVotes,
          });
        })
  )
  .get('/api/rooms/:id', ({ params: { id } }) => {
    return getRoomById(id);
  })
  .ws('/socket', {
    idleTimeout: 60 * 25,
    open(ws) {
      ws.subscribe(ws.data.query.roomId);
      // Add new display to room
      const newData = getRoomById(ws.data.query.roomId);

      ws.publish(ws.data.query.roomId, newData);
      ws.send(newData);
    },
    message(ws, { type, value }) {
      if (type === SocketActionTypes.ADD_DISPLAY) {
        const newData = updateDisplayCardValue(value.roomId, {
          cardValue: value.cardValue,
          name: value.displayId,
        });

        ws.publish(ws.data.query.roomId, newData);
        ws.send(newData);
      } else if (type === SocketActionTypes.RESET_ROOM_CARDS) {
        const newData = resetRoomCards(ws.data.query.roomId);
        ws.publish(ws.data.query.roomId, newData);
        ws.send(newData);
      } else if (type === SocketActionTypes.SHOW_VOTES) {
        const newData = updateRoom(ws.data.query.roomId, {
          showVotes: value,
        });

        ws.publish(ws.data.query.roomId, newData);
        ws.send(newData);
      } else if (type === SocketActionTypes.UPDATE_DISPLAY) {
        const newData = updateDisplayCardValue(value.roomId, {
          cardValue: value.cardValue,
          name: value.displayId,
        });

        ws.publish(ws.data.query.roomId, newData);
        ws.send(newData);
      } else if (type === SocketActionTypes.UPDATE_LABEL) {
        const newData = updateRoom(ws.data.query.roomId, {
          label: value,
        });

        ws.publish(ws.data.query.roomId, newData);
        ws.send(newData);
      }

      // TODO: Throw?
    },
    // TODO: handle closing??
    // close(ws, message) {
    //   console.log('close: ', ws.data.params.roomId);
    //   // roomSockets.delete(ws.data.params.roomId);
    // },
    query: t.Object({
      roomId: t.String(),
      displayId: t.String(),
    }),
    body: SocketActions,
    response: 'roomSocket',
  })

  // Displays
  .post(
    '/api/displays',
    ({ body }) => {
      const { roomId, name, cardValue, isHost } = body;

      return addOrUpdateDisplay(roomId, {
        cardValue,
        isHost,
        name,
      });
    },
    {
      body: t.Object({
        roomId: t.String(),
        name: t.String(),
        cardValue: t.Number(),
        isHost: t.Boolean(),
      }),
    }
  )

  // TODO: Probably remove...
  // .get('*', ({ headers, path, query }) => {
  //   console.log('hello glob', headers, path, query);
  //   throw new Error('nope glob...');
  // })
  .listen({
    port: Bun.env.VITE_API_PORT,
    hostname: Bun.env.VITE_API_URL,
  });

// TODO: Gate this or have some other logging?
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

console.table(
  app.routes.map((route) => ({ method: route.method, path: route.path }))
);

export type App = typeof app;
