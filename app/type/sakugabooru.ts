export interface SakugabooruPost {
    id: number;
    file_url: string;
    poster_url?: string; // ← CHANGE ÇA (au lieu de preview_url_hd)
    preview_url: string;
    preview_url_original?: string; // ← ET ÇA (optionnel)
    file_ext: string;
    width: number;
    height: number;
    tags: string;
    rating: 's' | 'q' | 'e';
    score: number;
    source?: string;
    author: string;
    animateur: string;
    created_at: number;
    updated_at: number;
    creator_id: number;
    parent_id: number | null;
    has_children: boolean;
    sample_url?: string;
}