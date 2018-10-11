using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Auction.Models
{
    public class ZillowModel
    {
        public class ZillowEstimate
        {
            //[Key]
            //public int ZillowEstimateId;
            public int ReturnCode;
            public string ReturnCodeMessage;
            public int ZillowId;
            public string LinktoMap;
            public string LinktoHomeDetails;
            //public string LinktoGraphsAndData;
            public string LinktoComparables;
            [DisplayFormat(DataFormatString = "{0:C}")]
            [Display(Name = "Estimated Value")]
            public decimal Estimate;
            public DateTime LastUpdated;
            public decimal ValueChange;
            public int ValueChangeDurationInDays;
            [DisplayFormat(DataFormatString = "{0:C}")]
            [Display(Name = "Low Value")]
            public decimal ValueRangeLow;
            [DisplayFormat(DataFormatString = "{0:C}")]
            [Display(Name = "High Value")]
            public decimal ValueRangeHigh;
            public decimal Latitude;
            public decimal Longitude;
            public string Street;
            public string City;
            public string State;
            [Display(Name = "Zip Code")]
            public string ZipCode;
            public string LinktoImages;
            [Display(Name = "")]
            public string GoogleUrl;
        }

    }
}