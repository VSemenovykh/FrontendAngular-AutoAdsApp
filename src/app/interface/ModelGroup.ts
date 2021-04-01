import { Model } from '../interface/model';

export interface ModelGroup {
  disabled?: boolean;
  name: string;
  model: Model[];
}
