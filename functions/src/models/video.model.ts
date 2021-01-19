export interface Video {
    kind?:                 string;
    etag?:                 string;
    id?:                   string;
    snippet?:              Snippet;
    contentDetails?:       ContentDetails;
    status?:               Status;
    statistics?:           Statistics;
    player?:               Player;
    topicDetails?:         TopicDetails;
    recordingDetails?:     RecordingDetails;
    fileDetails?:          FileDetails;
    processingDetails?:    ProcessingDetails;
    suggestions?:          Suggestions;
    liveStreamingDetails?: LiveStreamingDetails;
    localizations?:        Localizations;
}

export interface ContentDetails {
    duration?:           string;
    dimension?:          string;
    definition?:         string;
    caption?:            string;
    licensedContent?:    boolean;
    regionRestriction?:  RegionRestriction;
    contentRating?:      ContentRating;
    projection?:         string;
    hasCustomThumbnail?: boolean;
}

export interface ContentRating {
    acbRating?:              string;
    agcomRating?:            string;
    anatelRating?:           string;
    bbfcRating?:             string;
    bfvcRating?:             string;
    bmukkRating?:            string;
    catvRating?:             string;
    catvfrRating?:           string;
    cbfcRating?:             string;
    cccRating?:              string;
    cceRating?:              string;
    chfilmRating?:           string;
    chvrsRating?:            string;
    cicfRating?:             string;
    cnaRating?:              string;
    cncRating?:              string;
    csaRating?:              string;
    cscfRating?:             string;
    czfilmRating?:           string;
    djctqRating?:            string;
    djctqRatingReasons?:     string[];
    ecbmctRating?:           string;
    eefilmRating?:           string;
    egfilmRating?:           string;
    eirinRating?:            string;
    fcbmRating?:             string;
    fcoRating?:              string;
    fmocRating?:             string;
    fpbRating?:              string;
    fpbRatingReasons?:       string[];
    fskRating?:              string;
    grfilmRating?:           string;
    icaaRating?:             string;
    ifcoRating?:             string;
    ilfilmRating?:           string;
    incaaRating?:            string;
    kfcbRating?:             string;
    kijkwijzerRating?:       string;
    kmrbRating?:             string;
    lsfRating?:              string;
    mccaaRating?:            string;
    mccypRating?:            string;
    mcstRating?:             string;
    mdaRating?:              string;
    medietilsynetRating?:    string;
    mekuRating?:             string;
    mibacRating?:            string;
    mocRating?:              string;
    moctwRating?:            string;
    mpaaRating?:             string;
    mpaatRating?:            string;
    mtrcbRating?:            string;
    nbcRating?:              string;
    nbcplRating?:            string;
    nfrcRating?:             string;
    nfvcbRating?:            string;
    nkclvRating?:            string;
    oflcRating?:             string;
    pefilmRating?:           string;
    rcnofRating?:            string;
    resorteviolenciaRating?: string;
    rtcRating?:              string;
    rteRating?:              string;
    russiaRating?:           string;
    skfilmRating?:           string;
    smaisRating?:            string;
    smsaRating?:             string;
    tvpgRating?:             string;
    ytRating?:               string;
}

export interface RegionRestriction {
    allowed?: string[];
    blocked?: string[];
}

export interface FileDetails {
    fileName?:     string;
    fileSize?:     number;
    fileType?:     string;
    container?:    string;
    videoStreams?: VideoStream[];
    audioStreams?: AudioStream[];
    durationMs?:   number;
    bitrateBps?:   number;
    creationTime?: string;
}

export interface AudioStream {
    channelCount?: number;
    codec?:        string;
    bitrateBps?:   number;
    vendor?:       string;
}

export interface VideoStream {
    widthPixels?:  number;
    heightPixels?: number;
    frameRateFps?: number;
    aspectRatio?:  number;
    codec?:        string;
    bitrateBps?:   number;
    rotation?:     string;
    vendor?:       string;
}

export interface LiveStreamingDetails {
    actualStartTime?:    string;
    actualEndTime?:      string;
    scheduledStartTime?: string;
    scheduledEndTime?:   string;
    concurrentViewers?:  number;
    activeLiveChatId?:   string;
}

export interface Localizations {
    key?: LocalizedClass;
}

export interface LocalizedClass {
    title?:       string;
    description?: string;
}

export interface Player {
    embedHtml?:   string;
    embedHeight?: number;
    embedWidth?:  number;
}

export interface ProcessingDetails {
    processingStatus?:              string;
    processingProgress?:            ProcessingProgress;
    processingFailureReason?:       string;
    fileDetailsAvailability?:       string;
    processingIssuesAvailability?:  string;
    tagSuggestionsAvailability?:    string;
    editorSuggestionsAvailability?: string;
    thumbnailsAvailability?:        string;
}

export interface ProcessingProgress {
    partsTotal?:     number;
    partsProcessed?: number;
    timeLeftMs?:     number;
}

export interface RecordingDetails {
    recordingDate?: string;
}

export interface Snippet {
    publishedAt?:          string;
    channelId?:            string;
    title?:                string;
    description?:          string;
    thumbnails?:           Thumbnails;
    channelTitle?:         string;
    tags?:                 string[];
    categoryId?:           string;
    liveBroadcastContent?: string;
    defaultLanguage?:      string;
    localized?:            LocalizedClass;
    defaultAudioLanguage?: string;
}

export interface Thumbnails {
    key?: ThumbnailsKey;
}

export interface ThumbnailsKey {
    url?:    string;
    width?:  number;
    height?: number;
}

export interface Statistics {
    viewCount?:     number;
    likeCount?:     number;
    dislikeCount?:  number;
    favoriteCount?: number;
    commentCount?:  number;
}

export interface Status {
    uploadStatus?:            string;
    failureReason?:           string;
    rejectionReason?:         string;
    privacyStatus?:           string;
    publishAt?:               string;
    license?:                 string;
    embeddable?:              boolean;
    publicStatsViewable?:     boolean;
    madeForKids?:             boolean;
    selfDeclaredMadeForKids?: boolean;
}

export interface Suggestions {
    processingErrors?:   string[];
    processingWarnings?: string[];
    processingHints?:    string[];
    tagSuggestions?:     TagSuggestion[];
    editorSuggestions?:  string[];
}

export interface TagSuggestion {
    tag?:               string;
    categoryRestricts?: string[];
}

export interface TopicDetails {
    topicIds?:         string[];
    relevantTopicIds?: string[];
    topicCategories?:  string[];
}
