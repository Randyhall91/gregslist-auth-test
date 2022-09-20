import { Auth0Provider } from "@bcwdev/auth0provider";
import { jobsService } from "../services/JobsService.js";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";



export class JobsController extends BaseController {
  constructor() {
    super('api/jobs')
    this.router
      .get('', this.getJobs)
      .get('/:jobId', this.getJob)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.makeJob)
      .put('/:jobId', this.editJob)

  }

  async editJob(req, res, next) {
    try {
      req.body.id = req.params.jobId
      logger.log(req.body)
      const job = await jobsService.editJob(req.body, req.userInfo)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }
  async getJobs(req, res, next) {
    try {
      const jobs = await jobsService.getJobs()
      res.send(jobs)
    } catch (error) {
      next(error)
    }
  }
  async makeJob(req, res, next) {
    try {
      const formData = req.body
      formData.employeerId = req.userInfo.id

      const job = await jobsService.makeJob(formData)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async getJob(req, res, next) {
    try {
      const job = await jobsService.getJob(req.params.jobId)
      logger.log(job)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }


}