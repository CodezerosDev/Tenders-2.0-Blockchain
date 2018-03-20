function getExistingTenders(){
    var existingTenderInfo = [];

    TenderRepoInstance.getTenderCount.call((err, count) => {
        if(err){
            console.log(err);
            return;
        }

        for(var i=0; i < count; i++) {
            var tempAddress = TenderRepoInstance.getOngoingTenders.call(i);
            var tempDate = tempAddress.getBiddindCloseDate.call({gas : 5000000});
            var noOfBids = tempAddress.getProposalCount.call({gas : 5000000});

            var tenderObj = {};
            tenderObj.name = tempAddress;
            tenderObj.closingDate=tempDate;
            tenderObj.bidCount = noOfBids;
            
            existingTenderInfo.push(tenderObj);
        }
        console.log(existingTenderInfo);
        return existingTenderInfo;
    })
}

function getTenderInfo(tenderAddress) {
    var tenderBasicInfo;
    var tenderAdvancedInfo;

    tenderAddress.getTenderBasic.call({gas : 5000000}, (err, res) => {
        if(err){
            console.log(err);
            return;
        }
        tenderBasicInfo = res;
    });
    tenderAddress.getTenderAdvanced.call({gas : 5000000}, (err, res) => {
        if(err){
            console.log(err);
            return;
        }
        tenderAdvancedInfo = res;
    });
    //return both the params
    var tempObject = {};
    tempObject.basic = tenderBasicInfo;
    tempObject.advanced = tenderAdvancedInfo;
    console.log("Tender Basic Obj : " + JSON.stringify(tempObject));
    return tempObject;
}