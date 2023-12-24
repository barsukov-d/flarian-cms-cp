/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FilesUploadDto } from '../models/FilesUploadDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FilesService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static filesControllerUploadFile({
        formData,
    }: {
        /**
         * Upload files
         */
        formData: FilesUploadDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/files/upload',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static filesControllerGetAllFiles(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/files/all',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static filesControllerGetAllFilesByWebP(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/files/all-webp',
        });
    }

}
