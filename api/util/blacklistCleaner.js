const { blacklistTokenModel } = require("../model")
const CronJob = require('cron').CronJob;

function blacklistCleaner() {
    let tempDate = new Date();
    tempDate.setHours(tempDate.getHours - 12);

    blacklistTokenModel.deleteMany()
        .where("createdAt")
        .lt(tempDate)
        .then(result => {
            if (result.ok!==1) {
                console.log("An error occurred while cleaning the Blacklist!");
            } else {
                console.log(`Removed expired tokens from Blacklist - count: ${result.deletedCount}`);
            }
        })
        .catch(err => console.log(err));
};

//Creates the cron job that removes expired tokens from blacklist
module.exports = new CronJob('0 */12 * * *', blacklistCleaner);