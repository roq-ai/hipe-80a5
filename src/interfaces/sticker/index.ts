import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface StickerInterface {
  id?: string;
  name: string;
  image: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface StickerGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  image?: string;
  organization_id?: string;
}
