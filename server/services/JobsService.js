import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"



class JobsService {
  async editJob(jobData, userInfo) {
    const job = await this.getJob(jobData.id)

    if (userInfo.id != job.employeerId.toString()) {
      throw new Forbidden('not your job!')
    }
    job.title = jobData.title || job.title
    job.company = jobData.company || job.company
    job.pay = jobData.pay || job.pay
    job.hours = jobData.hours || job.hours
    job.description = jobData.description || job.description

    await job.save()
    return job
  }
  async makeJob(formData) {
    const job = await dbContext.Jobs.create(formData)
    return job
  }
  async getJob(jobId) {
    const job = await dbContext.Jobs.findById(jobId).populate('employeer', 'company title')
    logger.log(job)
    if (!job) {
      throw new BadRequest('This is not the job your looking for...')
    }
    return job

  }
  async getJobs() {
    let jobs = await dbContext.Jobs.find()
    return jobs
  }


}
export const jobsService = new JobsService()