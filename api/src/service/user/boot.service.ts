import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PinoLogger } from 'nestjs-pino/dist'
import { UserCreateService } from './user.create.service'
import { UserService } from './user.service'

@Injectable()
export class BootService implements OnApplicationBootstrap {
  constructor(
    private readonly createService: UserCreateService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {
  }

  async onApplicationBootstrap(): Promise<void> {
    const create = this.configService.get<string>('CREATE_ADMIN', 'false')

    if (!create || ['false', '0', 'no', ''].includes(create.toLowerCase())) {
      return
    }

    this.logger.warn('admin user check is still enabled! once your use has been created this should be disabled')
    let adminExists = false
    let apiUserExists = false

    const username = this.configService.get<string>('ADMIN_USERNAME', 'root')
    const email = this.configService.get<string>('ADMIN_EMAIL', 'admin@ohmyform.com')
    const password = this.configService.get<string>('ADMIN_PASSWORD', 'root')

    const apiUsername = this.configService.get<string>('API_USERNAME', 'apiUserName')
    const apiEmail = this.configService.get<string>('API_EMAIL', 'ApiEmail@mail.io')
    const apiPassword = this.configService.get<string>('API_PASSWORD', 'notUsable')

    try {
      await this.userService.findByUsername(username)

      adminExists = true
      this.logger.info('username already exists, skip creating')
      // return
    } catch (e) {}

    try {
      await this.userService.findByEmail(email)

      adminExists = true
      this.logger.info('email already exists, skip creating')
      // return
    } catch (e) {}

    try {
      await this.userService.findByUsername(apiUsername)

      apiUserExists = true
      this.logger.info('username already exists, skip creating')
      // return
    } catch (e) {}

    try {
      await this.userService.findByEmail(apiEmail)

      apiUserExists = true
      this.logger.info('email already exists, skip creating')
      // return
    } catch (e) {}

    try {
      if(!adminExists) {
        await this.createService.create({
          username,
          email,
          password,
        }, ['user', 'admin', 'superuser'])
      }
    } catch (e) {
      this.logger.error({
        error: e,
      }, 'could not create admin user')
      return
    }
    try {
      if(!apiUserExists) {
        await this.createService.create({
          username: apiUsername,
          email: apiEmail,
          password: apiPassword,
        }, ['user', 'admin', 'superuser'])
      }
    } catch (e) {
      this.logger.error({
        error: e,
      }, 'could not create admin user')
      return
    }

    this.logger.info('new root user created')
  }
}
