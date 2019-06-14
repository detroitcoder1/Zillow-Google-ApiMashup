using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using Auction.Controllers;
using Auction.Models;
using Auction.Repository;
using static Auction.Models.ZillowModel;


namespace Auction.Controllers
{
    public class CityNodesController : Controller
    {

        public string ZillowAPIDeveloperKey { get; set; }
        public string GoogleAPIDeveloperKey { get; set; }
        private AddressRepository r = new AddressRepository();

        // GET: CityNodes
        public ActionResult Index()
        {
           
            var z = GetZillowModel().Take(5);
            var count = r.FindAll().Count();

          
            return View(z.ToList());
        }





        //[Authorize]
        public ActionResult Details(int id)
        {
            var z = GetZillowModel();
            var Property = z.Where(x => x.ZillowId == id).FirstOrDefault();
            if (Property == null)
            {
                return HttpNotFound();
            }
            return View(Property);
        }



        // GET: CityNodes/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var cityNode = r.FindAll().Where(x => x.CityNodeId == id).FirstOrDefault();

            if (cityNode == null)
            {
                return HttpNotFound();
            }
            return View(cityNode);
        }

        // POST: CityNodes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {

            var _id = id;
            //var cityNodes = r.FindAll().ToList();
            //var cityNode = cityNodes.Where(x => x.CityNodeId == id).FirstOrDefault();
            r.Remove(_id);

            return RedirectToAction("Index");
        }

        public List<ZillowEstimate> GetZillowModel()
        {

            var ZillowModels = new List<ZillowEstimate>();
            var citynodes = r.FindAll().GroupBy(x => x.PropertyID).Select(grp => grp.FirstOrDefault()).ToList();
            ZillowAPIDeveloperKey = "X1-ZWz1goni7v5ukr_9tzan";
            GoogleAPIDeveloperKey = "AIzaSyBJTntA6I2kn3Y3wC17WECYAsLViTT8QSg";
            for (int i = 0; i < citynodes.Count; i++)
            {
                var address = Server.UrlEncode(citynodes[i].Address);
                var zipOrCityState = Server.UrlEncode(Convert.ToString(citynodes[i].ZipCode));
                var zEstimate = ZillowAPIController.GetZestimate(ZillowAPIDeveloperKey, address, zipOrCityState);
                if (zEstimate.ReturnCode == 0)
                {
                    ZillowModels.Add(zEstimate);
                }

            }
            return ZillowModels;
        }

        [HttpPost]
        public ActionResult FilterbyZip(string ZipCode)
        {
            if (ZipCode == null)
            {
                return HttpNotFound();
            }
            var houses = GetZillowModel().Where(x => x.ZipCode == ZipCode);

            return View("Index", houses.ToList());
        }

        [HttpPost]
        public ActionResult FilterbyStreet(string Street)
        {
            if (Street == null)
            {
                return HttpNotFound();
            }
            var houses = GetZillowModel().Where(x => x.Street.ToLower().Contains(Street.ToLower()));

            return View("Index", houses.ToList());


        }

        [HttpPost]
        public ActionResult SortHigh2Low()
        {

            var houses = GetZillowModel().OrderByDescending(x => x.City);

            return View("Index", houses.ToList());


        }


        [HttpPost]
        public ActionResult SortLow2High(List<ZillowEstimate> model)
        {

            var houses = model.OrderByDescending(x => x.Estimate);

            return View("Index", houses.ToList());


        }
    }
}