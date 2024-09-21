import {type Static, t } from 'elysia';

export const roomSocketModel = t.Object({
    id: t.String(),
    label: t.String(),
    name: t.String(),
    showVotes: t.Boolean(),

    displays: t.Array(
      t.Object({
        name: t.String(),
        cardValue: t.Number(),
        isHost: t.Boolean(),
      })
    ),

    ttl: t.Number(),
  })

export type RoomSocketModel = Static<typeof roomSocketModel>;
