import { Country } from '@/lib/type';
import { Harbor } from '../../lib/type';

export type FieldType = {
  negara?: string;
  pelabuhan?: string;
  barang?: string;
  discount?: string;
  harga?: string;
  total?: string;
};

export type FormValue = {
  negara: Country[];
  pelabuhan: Harbor[];
  barang: any;
};

export type SelectedFormValue = {
  negara: string;
  pelabuhan: string;
  barang: string;
};
