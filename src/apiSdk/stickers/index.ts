import axios from 'axios';
import queryString from 'query-string';
import { StickerInterface, StickerGetQueryInterface } from 'interfaces/sticker';
import { GetQueryInterface } from '../../interfaces';

export const getStickers = async (query?: StickerGetQueryInterface) => {
  const response = await axios.get(`/api/stickers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSticker = async (sticker: StickerInterface) => {
  const response = await axios.post('/api/stickers', sticker);
  return response.data;
};

export const updateStickerById = async (id: string, sticker: StickerInterface) => {
  const response = await axios.put(`/api/stickers/${id}`, sticker);
  return response.data;
};

export const getStickerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/stickers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteStickerById = async (id: string) => {
  const response = await axios.delete(`/api/stickers/${id}`);
  return response.data;
};
