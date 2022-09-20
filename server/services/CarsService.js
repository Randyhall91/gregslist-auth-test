import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CarsService {
  async deleteCar(carId, userInfo) {
    const car = await this.getCar(carId)

    if (userInfo.id != car.sellerId.toString()) {
      throw new Forbidden('Thats not your car... Go away')
    }
    await car.delete()
    // dbContext.Cars.findByIdAndDelete(car.id)
    // await car.save

  }
  async editCar(carData, userInfo) {
    const car = await this.getCar(carData.id)

    if (userInfo.id != car.sellerId.toString()) {
      throw new Forbidden('Thats not your car... Go away')
    }

    car.make = carData.make || car.make
    car.model = carData.model || car.model
    car.price = carData.price || car.price
    car.year = carData.year || car.year
    car.description = carData.description || car.description
    car.imgUrl = carData.imgUrl || car.imgUrl

    await car.save()

    return car
  }
  async getCar(carId) {
    const car = await dbContext.Cars.findById(carId).populate('seller', 'name picture')
    if (!car) {
      throw new BadRequest('Invalid Car id')
    }
    return car
  }



  async manufactureCar(formData) {
    const car = await dbContext.Cars.create(formData)
    return car
  }

  async getCars() {
    const cars = await dbContext.Cars.find()

    return cars
  }

}


export const carsService = new CarsService()
