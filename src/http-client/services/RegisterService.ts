/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthDto } from '../models/AuthDto';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RegisterService {

    /**
     * @returns User Register user
     * @throws ApiError
     */
    public static authControllerRegister({
        requestBody,
    }: {
        requestBody: AuthDto,
    }): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
