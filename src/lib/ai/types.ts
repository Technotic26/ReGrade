export interface DefectItem {
  defectClass: "scratch" | "dent" | "crack" | "burn" | "wear";
  zone: string;
  boundingBox?: [number, number, number, number]; // [ymin, xmin, ymax, xmax] in %
  severity: "minor" | "moderate" | "severe";
}

export interface ConditionResult {
  grade: "A" | "B" | "C" | "D";
  confidenceScore: number;
  detectedDefects: DefectItem[];
  explanation: string;
  isMock: boolean;
}

export interface IConditionGradingService {
  gradeListing(params: {
    categorySlug: string;
    modelName: string;
    imageUrls: string[];
    declaredFunctionalIssues?: string[];
    batteryHealth?: number;
  }): Promise<ConditionResult>;
}
