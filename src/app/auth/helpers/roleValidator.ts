import { UserResponse } from './../../shared/models/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

export class RoleValidator {
    isUser(user: UserResponse): boolean {
        const elUser = JSON.parse(localStorage.getItem('user')) || null;
        if (elUser) {
            return true;
        } else {
            return false;
        }
    }
}
