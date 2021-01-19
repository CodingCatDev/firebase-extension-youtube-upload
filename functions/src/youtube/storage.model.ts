interface StorageMetadata {
    /**
     * Served as the 'Cache-Control' header on object download.
     */
    cacheControl?: string | null;
    contentDisposition?: string | null;
    /**
     * Served as the 'Content-Encoding' header on object download.
     */
    contentEncoding?: string | null;
    /**
     * Served as the 'Content-Language' header on object download.
     */
    contentLanguage?: string | null;
    /**
     * Served as the 'Content-Type' header on object download.
     */
    contentType?: string | null;
    /**
     * Additional user-defined custom metadata.
     */
    customMetadata?: {
        [/* warning: coerced from ? */ key: string]: string;
    } | null;
    /**
     * The bucket this object is contained in.
     */
    bucket: string;
    /**
     * @deprecated
     * Use Reference.getDownloadURL instead. This property will be removed in a
     * future release.
     */
    downloadURLs: string[];
    /**
     * The full path of this object.
     */
    fullPath: string;
    /**
     * The object's generation.
     * @see {@link https://cloud.google.com/storage/docs/generations-preconditions}
     */
    generation: string;
    /**
     * The object's metageneration.
     * @see {@link https://cloud.google.com/storage/docs/generations-preconditions}
     */
    metageneration: string;
    /**
     * The short name of this object, which is the last component of the full path.
     * For example, if fullPath is 'full/path/image.png', name is 'image.png'.
     */
    name: string;
    /**
     * The size of this object, in bytes.
     */
    size: number;
    /**
     * A date string representing when this object was created.
     */
    timeCreated: string;
    /**
     * A date string representing when this object was last updated.
     */
    updated: string;
}