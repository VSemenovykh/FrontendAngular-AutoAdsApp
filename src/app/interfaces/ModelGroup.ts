import { Model } from './/model';

export interface ModelGroup {
  disabled?: boolean;
  name: string;
  model: Model[];
}
