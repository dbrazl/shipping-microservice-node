import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { HealthDto } from "adapters/dtos/HealthDto";
import { IShippingController } from "adapters/interfaces/IShippingController";
import { IExpressShippingRequestHandler } from "infrastructure/interfaces/IExpressShippingRequestHandler";
import { GetAddressDto } from "adapters/dtos/GetAddressDto";

@injectable()
export class ExpressShippingRequestHandler implements IExpressShippingRequestHandler {
  private readonly shippingController: IShippingController;

  constructor(@inject('IShippingController') shippingController: IShippingController) {
    this.shippingController = shippingController;
  }

  public handleHealth(request: Request, response: Response): Response {
    const healthDto: HealthDto = this.shippingController.health();
    return response.status(healthDto.statusCode).json();
  }

  public async handleGetAddress(request: Request, response: Response): Promise<Response> {
    const { zipCode } = request.params;
    const getAddressDto: GetAddressDto = await this.shippingController.getAddress(zipCode);
    return response.status(getAddressDto.statusCode).json(getAddressDto.addressDto);
  }
}
