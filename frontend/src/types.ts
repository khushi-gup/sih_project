export type Coordinates = [number, number];

export type DetectionStatus = "new" | "under_review" | "verified" | "rejected";

export type Detection = {
  id: string;
  change_type: string;
  status: DetectionStatus;
  centroid: Coordinates;
  geometry: GeoJSON.Polygon;
  distance_to_school_m: number;
  area_sqm: number;
  confidence: number;
  detected_between: string[];
  detected_on?: string;
  label?: string;
  note: string;
  source: string;
  importedAt?: string;
  updatedAt: string;
  evidence: string[];
};

export type DetectionFilterState = {
  statuses: DetectionStatus[];
  minConfidence: number;
  maxDistanceM: number;
  showRejected: boolean;
};

export type ImportSkip = {
  row: number;
  reason: string;
};

export type DetectionImportPreview = {
  source: string;
  importedAt: string;
  detections: Detection[];
  validRows: number;
  skippedRows: ImportSkip[];
};

export type CaseEventKind = "analysis" | "import" | "review" | "report" | "case";

export type CaseEvent = {
  id: string;
  kind: CaseEventKind;
  title: string;
  detail: string;
  createdAt: string;
};

export type ImageMeta = {
  id: string;
  label: string;
  date: string;
  cloud_cover: number;
  resolution_m: number;
  provider: string;
  bounds: [number, number, number, number];
};

export type LayerMeta = {
  id: string;
  name: string;
  type: string;
  date?: string;
  count?: number;
  enabled: boolean;
  radii_m?: number[];
};

export type School = {
  id: string;
  name: string;
  type: string;
  coordinates: Coordinates;
};

export type PipelineStep = {
  name: string;
  status: string;
  detail: string;
};

export type AnalysisSummary = {
  radius_m: number;
  total_detections: number;
  inside_buffer: number;
  outside_buffer: number;
  high_confidence_inside: number;
  total_new_area_sqm: number;
  average_confidence: number;
  nearest_detection_m: number;
  farthest_inside_m: number;
};

export type Evidence = {
  id: string;
  distance_to_school_m: number;
  confidence: number;
  area_sqm: number;
  assessment: string;
  notes: string[];
};

export type ParsedQuery = {
  intent: string;
  target: string;
  date_range: string[];
  relation: string;
  anchor: string;
  radius_m: number;
  filters: string[];
  confidence: number;
};

export type AnalysisResult = {
  query: string;
  parsed_query: ParsedQuery;
  summary: AnalysisSummary;
  images: ImageMeta[];
  school: School;
  layers: LayerMeta[];
  detections: Detection[];
  detections_geojson: GeoJSON.FeatureCollection;
  context_geojson: GeoJSON.FeatureCollection;
  buffer_geojson: GeoJSON.Feature;
  evidence: Evidence[];
  pipeline: PipelineStep[];
  answer: string;
};

export type Report = {
  title: string;
  case_id: string;
  query: string;
  executive_summary: string;
  method: string[];
  key_metrics: AnalysisSummary;
  limitations: string[];
  attachments: string[];
  analysis: AnalysisResult;
};
