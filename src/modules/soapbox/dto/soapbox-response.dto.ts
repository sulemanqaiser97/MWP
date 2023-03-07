export class SoapboxPhoneBreakdown {
  phone: string;
  quality_score: number;
  start: number;
  end: number;
}

export class SoapboxWordBreakdown {
  quality_score: number;
  target_transcription: string;
  word: string;
  token_type: string;
  phone_breakdown: SoapboxPhoneBreakdown[];
  start: number;
  end: number;
}

export class SoapboxResult {
  category: string;
  hypothesis_score: number;
  word_breakdown: SoapboxWordBreakdown[];
  start: number;
  end: number;
}

export class SoapboxResponseDto {
  language_code: string;
  result_id: string;
  time: string;
  user_id: string;
  results: SoapboxResult[];
}
