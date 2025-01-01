import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { AdminService } from '../admin/admin.service';
import { RoleService } from '../role/role.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
    private roleService: RoleService,
  ) { }

  private async createJwtPayload(
    accountHolder: any,
    isUser: boolean,
  ): Promise<any> {
    if (isUser) {
      return {
        _id: accountHolder._id,
        role: accountHolder.role,
        isBlock: accountHolder.isBlock,
        sub: accountHolder._id,
      };
    } else {
      const roles = await this.roleService.findRoleService(
        accountHolder.role.map(String),
      );
      return {
        _id: accountHolder._id,
        email: accountHolder.email,
        fullname: accountHolder.fullname,
        role: roles,
      };
    }
  }

  async loginService(
    account: string,
    password: string,
  ): Promise<{ access_token: string; refreshToken: string; user: any }> {
    try {
      const admin =
        await this.adminService.findOneAdminUserNameService(account);
      const accountHolder = admin;

      if (!accountHolder) {
        throw new UnauthorizedException('Account not found');
      }

      if (!(await bcrypt.compare(password, accountHolder.password))) {
        throw new UnauthorizedException('Password is incorrect');
      }

      if (accountHolder.isBlock) {
        throw new UnauthorizedException('Account is blocked');
      }

      const createRefreshToken = randomBytes(32).toString('hex');
      const payload = await this.createJwtPayload(accountHolder, false);
      await this.adminService.updateRefreshTokenService(
        accountHolder.userName,
        createRefreshToken,
      );
      return {
        access_token: this.jwtService.sign(payload),
        refreshToken: createRefreshToken,
        user: payload,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async refreshTokenService(
    refreshToken: string,
  ): Promise<{ access_token: string; refreshToken: string }> {
    try {
      const admin =
        await this.adminService.findOneAdminRefreshTokenService(refreshToken);
      const accountHolder = admin;

      if (!accountHolder) {
        throw new Error('refresh Token not found');
      }
      if (accountHolder.isBlock) {
        throw new UnauthorizedException('Account is blocked');
      }

      const createRefreshToken = randomBytes(32).toString('hex');
      const payload = await this.createJwtPayload(accountHolder, false);

      await this.adminService.updateRefreshTokenService(
        accountHolder.nameAdmin,
        createRefreshToken,
      );

      return {
        access_token: this.jwtService.sign(payload),
        refreshToken: createRefreshToken,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async logoutService(refreshToken: string): Promise<{ message: string }> {
    try {
      console.log(refreshToken);
      const admin =
        await this.adminService.findOneAdminRefreshTokenService(refreshToken);

      const accountHolder = admin;

      if (!accountHolder) {
        throw new Error('refresh Token not found');
      }
      await this.adminService.updateRefreshTokenService(admin.nameAdmin, null);
      return { message: 'Logout successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async handleVerifyTokenService(token: string): Promise<string> {
    try {
      const Payload = this.jwtService.verify(token);
      return Payload['_id'];
    } catch (error) {
      throw new BadRequestException('Token is invalid');
    }
  }
}
