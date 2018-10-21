using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HeatMaps.Helpers;

namespace HeatMaps.Hubs {
    public class ChatHub : Hub {
        public async Task SendMessage(string user, string message, string url) {
            if (message.ToLower() == "clean") {
                await Clients.Caller.SendAsync("Clean");
            } else if (message.StartsWith("> ")) {
                await Clients.Caller.SendAsync("ReceiveMessage", user, "The map is refreshing with new data!", message.Replace("> ", ""));
            }
            else {
                await Clients.Caller.SendAsync("ReceiveMessage", user, "Please wait...", null);
                try {
                    var model = Requester.Do(message, url);
                    await Clients.Caller.SendAsync("UpdateData", model.Type, model.FromDate, model.ToDate, model.City,
                        model.Lon, model.Lat);
                    await Clients.Caller.SendAsync("ReceiveMessage", user, model.Msg, null);
                }
                catch {
                    await Clients.Caller.SendAsync("ReceiveMessage", user, "Something weeeeent wrong :(", null);
                }
            }

            // Send to everyone
            // await Clients.All.SendAsync("ReceiveMessage", user, message);

            // Send to single
            // await Clients.Caller.SendAsync("ReceiveMessage", user, message, null);

            // Fly To
            // await Clients.Caller.SendAsync("FlyTo", lon, lat, zoom);

            // Zoom
            // await Clients.Caller.SendAsync("Zoom", zoom);
        }

    }

    
}
