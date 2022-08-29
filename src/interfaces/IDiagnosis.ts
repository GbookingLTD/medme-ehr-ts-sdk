export interface IDiagnosis {
  description?: string;
  cd10: Cd10;
}

interface Cd10 {
  description: string;
  code: string;
}