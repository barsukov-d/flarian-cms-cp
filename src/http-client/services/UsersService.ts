/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static usersControllerRegister(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/getAllUsers',
        });
    }

}
