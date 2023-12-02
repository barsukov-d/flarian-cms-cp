/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCategoryDto } from '../models/CreateCategoryDto';
import type { CreateTagDto } from '../models/CreateTagDto';
import type { UpdateCategoryDto } from '../models/UpdateCategoryDto';
import type { UpdateTagDto } from '../models/UpdateTagDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static categoriesControllerCreate({
        requestBody,
    }: {
        requestBody: CreateCategoryDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/categories',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static categoriesControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static categoriesControllerFindOne({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static categoriesControllerUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateCategoryDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/categories/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static categoriesControllerRemove({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/categories/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static tagsControllerCreate({
        requestBody,
    }: {
        requestBody: CreateTagDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tags',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static tagsControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tags',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static tagsControllerFindOne({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tags/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static tagsControllerUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateTagDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/tags/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static tagsControllerRemove({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/tags/{id}',
            path: {
                'id': id,
            },
        });
    }

}
