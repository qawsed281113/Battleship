#pragma checksum "C:\Users\qawsed\Bobych\Renju\Pages\Game\CreateMap.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "5bc5734560facb38c2265d3e11657ecb891d482a"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(Exam.Pages.Game.Pages_Game_CreateMap), @"mvc.1.0.razor-page", @"/Pages/Game/CreateMap.cshtml")]
namespace Exam.Pages.Game
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\qawsed\Bobych\Renju\Pages\_ViewImports.cshtml"
using Microsoft.AspNetCore.Identity;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\qawsed\Bobych\Renju\Pages\_ViewImports.cshtml"
using Exam;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\Users\qawsed\Bobych\Renju\Pages\_ViewImports.cshtml"
using Exam.Data;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"5bc5734560facb38c2265d3e11657ecb891d482a", @"/Pages/Game/CreateMap.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"609601c454ecfa12a31730e84a331cdd7cf724e1", @"/Pages/_ViewImports.cshtml")]
    public class Pages_Game_CreateMap : global::Microsoft.AspNetCore.Mvc.RazorPages.Page
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"
<div class=""main_field"">
    <div class=""half"" id=""ships"">
        <h1>Ships</h1>
        <div class=""field_game"" id=""ships_field"">
        </div>
    </div>

    <div class=""half"" id=""map"">
        <h1>Map</h1>
        <div class=""field_game"">
            <table class=""play_field"" id=""map_field"">
        
            </table>
        </div>
    </div>
</div>
<div class=""button"" id=""clear_map"">
    Clear map
</div>
<div id=""go_to_game"" hidden>
    Go to the game
</div>
<div id=""player_id"" hidden>");
#nullable restore
#line 28 "C:\Users\qawsed\Bobych\Renju\Pages\Game\CreateMap.cshtml"
                      Write(Model.Player.Id);

#line default
#line hidden
#nullable disable
            WriteLiteral("</div>\r\n<div id=\"game_id\" hidden>");
#nullable restore
#line 29 "C:\Users\qawsed\Bobych\Renju\Pages\Game\CreateMap.cshtml"
                    Write(Model.Game.Id);

#line default
#line hidden
#nullable disable
            WriteLiteral("</div>\r\n<script src=\"/lib/jquery/dist/jquery.min.js\"></script>\r\n<script src=\"/js/newgame.js\"></script>\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<Exam.Pages.Game.CreateMap> Html { get; private set; }
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<Exam.Pages.Game.CreateMap> ViewData => (global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<Exam.Pages.Game.CreateMap>)PageContext?.ViewData;
        public Exam.Pages.Game.CreateMap Model => ViewData.Model;
    }
}
#pragma warning restore 1591
