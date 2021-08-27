import { Injectable, ExecutionContext } from '@nestjs/common'
import { Args, Context, Mutation, ID } from '@nestjs/graphql'
import { Roles } from '../../decorator/roles.decorator'
import { User } from '../../decorator/user.decorator'
import { FormModel } from '../../dto/form/form.model'
import { FormUpdateInput } from '../../dto/form/form.update.input'
import { FormEntity } from '../../entity/form.entity'
import { UserEntity } from '../../entity/user.entity'
import { FormService } from '../../service/form/form.service'
import { FormUpdateService } from '../../service/form/form.update.service'
import { ContextCache } from '../context.cache'
import { Request } from 'express-serve-static-core'
@Injectable()
export class FormUpdateMutation {
  constructor(
    private readonly updateService: FormUpdateService,
    private readonly formService: FormService,
  ) {
  }

  @Mutation(() => FormModel)
  @Roles('admin')
  async updateForm(
    @User() user: UserEntity,
    @Args({ name: 'form', type: () => FormUpdateInput }) input: FormUpdateInput,
    @Context('cache') cache: ContextCache,
  ): Promise<FormModel> {
    const form = await this.formService.findById(input.id)

    if (!form.isLive && !await this.formService.isAdmin(form, user)) {
      throw new Error('invalid form')
    }

    await this.updateService.update(form, input)

    cache.add(cache.getCacheKey(FormEntity.name, form.id), form)

    return new FormModel(form)
  }

  @Mutation(() => FormModel)
  async updateFormApi(
    @Args({ name: 'form', type: () => FormUpdateInput }) input: FormUpdateInput,
    @Context('req') context: Request,
    @Context('cache') cache: ContextCache,
  ): Promise<FormModel> {
    if (!context.headers['x-api-key']) {
      throw new Error('Authorization failed')
    }
   
    const form = await this.formService.findById(input.id)

    await this.updateService.update(form, input)

    cache.add(cache.getCacheKey(FormEntity.name, form.id), form)

    return new FormModel(form)
  }
}
