import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { stickerValidationSchema } from 'validationSchema/stickers';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.sticker
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getStickerById();
    case 'PUT':
      return updateStickerById();
    case 'DELETE':
      return deleteStickerById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStickerById() {
    const data = await prisma.sticker.findFirst(convertQueryToPrismaUtil(req.query, 'sticker'));
    return res.status(200).json(data);
  }

  async function updateStickerById() {
    await stickerValidationSchema.validate(req.body);
    const data = await prisma.sticker.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteStickerById() {
    const data = await prisma.sticker.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
