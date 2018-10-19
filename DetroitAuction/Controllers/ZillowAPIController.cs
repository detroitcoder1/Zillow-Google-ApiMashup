using System.Net;
using System.Xml;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using static Auction.Models.ZillowModel;
using Auction.Repository;

namespace Auction.Controllers
{
    public class ZillowAPIController : Controller


    {


        public static ZillowEstimate GetZestimate(string zillowWebServiceId, string Address, string ZipCode)
        {


            //http://www.zillow.com/howto/api/GetSearchResults.htm
            
            var z = new ZillowEstimate();

            var googleApiId = "AIzaSyBJTntA6I2kn3Y3wC17WECYAsLViTT8QSg";
            // Construct the url
            var url = String.Format("http://www.zillow.com/webservice/GetSearchResults.htm?zws-id={0}&address={1}&citystatezip={2}", zillowWebServiceId, Address, ZipCode);
           
            

            // Make the HTTP request / get the response
            var Request = (System.Net.HttpWebRequest)WebRequest.Create(url);
            var Response = (HttpWebResponse)Request.GetResponse();

            // Parse the HTTP response into an XML document
            XmlDocument xml = new XmlDocument();
            xml.Load(Response.GetResponseStream());
            XmlElement root = xml.DocumentElement;

            //Return Code
            z.ReturnCode = int.Parse(root.SelectSingleNode("//message/code").InnerText);
            z.ReturnCodeMessage = root.SelectSingleNode("//message/text").InnerText;

            if (z.ReturnCode == 0)
                try
                {
                    z.ZillowId = int.Parse(root.SelectSingleNode("//response/results/result/zpid").InnerText);
                    z.LinktoMap = root.SelectSingleNode("//response/results/result/links/mapthishome").InnerText;
                    z.LinktoHomeDetails = root.SelectSingleNode("//response/results/result/links/homedetails").InnerText;
                    //z.LinktoGraphsAndData = root.SelectSingleNode("//response/results/result/links/graphsanddata").InnerText;
                    z.LinktoComparables = root.SelectSingleNode("//response/results/result/links/comparables").InnerText;
                    z.Estimate = decimal.Parse(root.SelectSingleNode("//response/results/result/zestimate/amount").InnerText);
                    z.LastUpdated = DateTime.Parse(root.SelectSingleNode("//response/results/result/zestimate/last-updated").InnerText);
                    z.ValueChange = decimal.Parse(root.SelectSingleNode("//response/results/result/zestimate/valueChange").InnerText);
                    z.ValueChangeDurationInDays = int.Parse(root.SelectSingleNode("//response/results/result/zestimate/valueChange").Attributes["duration"].Value);
                    z.ValueRangeLow = decimal.Parse(root.SelectSingleNode("//response/results/result/zestimate/valuationRange/low").InnerText);
                    z.ValueRangeHigh = decimal.Parse(root.SelectSingleNode("//response/results/result/zestimate/valuationRange/high").InnerText);
                    z.Street = root.SelectSingleNode("//response/results/result/address/street").InnerText;
                    z.City = root.SelectSingleNode("//response/results/result/address/city").InnerText;
                    z.State = root.SelectSingleNode("//response/results/result/address/state").InnerText;
                    z.ZipCode = root.SelectSingleNode("//response/results/result/address/zipcode").InnerText;
                    z.Latitude = decimal.Parse(root.SelectSingleNode("//response/results/result/address/latitude").InnerText);
                    z.Longitude = decimal.Parse(root.SelectSingleNode("//response/results/result/address/longitude").InnerText);
                    //url for google image
                    z.GoogleUrl = String.Format("https://maps.googleapis.com/maps/api/streetview?size=100x100&location={1},{2}&fov=90&heading=235&pitch=10&key={0}", googleApiId, z.Latitude, z.Longitude);
                }

                
                catch (Exception ex)
                {

                    ex.ToString();
                }

            finally
                {
                    Response.Close();
                     

                }
            return z;


        }

        
    }


}