exports.message = (email, code) => {

    return `<!doctype html>
    <html ⚡4email>
    <body>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" dir="ltr" lang="en">
    <tbody><tr>
       <td valign="top" width="50%"></td>
       <td valign="top">
           
          <table width="640" cellpadding="0" cellspacing="0" border="0" dir="ltr" lang="en" style="border-left:1px solid #e3e3e3;border-right:1px solid #e3e3e3">
           <tbody><tr style="background-color:#ffffff">
               <td width="1" style="background:#ffffff;border-top:1px solid #e3e3e3"></td>
               <td width="24" style="border-top:1px solid #e3e3e3;border-bottom:1px solid #e3e3e3">&nbsp;</td>
               <td width="310" valign="middle" style="border-top:1px solid #e3e3e3;border-bottom:1px solid #e3e3e3;padding:12px 0">
                   <h1 style="line-height:20pt;font-family:Segoe UI Light;font-size:18pt;color:#ffffff;font-weight:normal">
                       
                        <span><font color="Black">Verify your email address</font></span>

                   </h1>
               </td>
               <td width="24" style="border-top:1px solid #e3e3e3;border-bottom:1px solid #e3e3e3">&nbsp;</td>
           </tr>
          </tbody></table>
          
          <table width="640" cellpadding="0" cellspacing="0" border="0" dir="ltr" lang="en">
           <tbody><tr>
               <td width="1" style="background:#e3e3e3"></td>
               <td width="24">&nbsp;</td>
               <td id="m_-9046844951411061941m_1805694316701454090PageBody" width="640" valign="top" colspan="2" style="border-bottom:1px solid #e3e3e3;padding:10px 0 20px">		
                   <table cellpadding="0" cellspacing="0" border="0">
                       <tbody><tr>
                           <td width="630" style="font-size:10pt;line-height:13pt;color:#000">
                               <table cellpadding="0" cellspacing="0" border="0" width="100%" dir="ltr" lang="en">
                                   <tbody><tr>
                                       <td>
                                           
                                            <div style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;color:#333">
                                            <span>Thanks for verifying your <a href="mailto:${email}" target="_blank">${email}</a> account!</span>
                                            </div>
                                            <br>
                                            <div style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;color:#333;font-weight:bold">
                                            <span>Your code is: ${code}</span>
                                            </div>
                                            <br>
                                            <br>

                                           <div style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;color:#333">
                                           Sincerely,
                                           </div>
                                           <div style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;font-style:italic;color:#333">
                                            Save the Children International 
                                           </div>
                                       </td>
                                   </tr>
                               </tbody></table>
                           </td>
                       </tr>
                   </tbody></table>

               </td>

               <td width="1">&nbsp;</td>
               <td width="1"></td>
               <td width="1">&nbsp;</td>
               <td width="1" valign="top"></td>			 
               <td width="29">&nbsp;</td>
               <td width="1" style="background:#e3e3e3"></td>
           </tr>
           <tr>
               <td width="1" style="background:#e3e3e3;border-bottom:1px solid #e3e3e3"></td>
               <td width="24" style="border-bottom:1px solid #e3e3e3">&nbsp;</td>
               <td id="m_-9046844951411061941m_1805694316701454090PageFooterContainer" width="585" valign="top" colspan="6" style="border-bottom:1px solid #e3e3e3;padding:20px 0">
                   <table cellpadding="0" cellspacing="0" border="0" width="585">
<tbody><tr>
   <td>
                                   <table cellpadding="0" cellspacing="0" border="0" dir="ltr" lang="en" style="margin-right:30px">
                                       <tbody><tr>
                                           <td>
                                               <p style="font-family:'Segoe UI',Tahoma,sans-serif;margin:0px 0px 0px 5px;color:#666;font-size:10px">
                                                   
                                                   This message was sent from an unmonitored email address. Please do not reply to this message.
                                                   
                                                   
                                               </p>
                                           </td>
                                       </tr>
                                   </tbody></table>
                           </td>
   <td style="padding:0;text-align:right">
                               <img id="m_-9046844951411061941m_1805694316701454090CompanyLogo" src="https://ci4.googleusercontent.com/proxy/XvFyJ7KSJrn7x4i_qOsIRmiXH4ISH3iJTnp3D_s_W-JnL4jJCJsltm4QSMFYObEbB6a8qLTkBJZ4m8FwpN7qEuJJfiGu4X_rmV3nVPpXrkNyds4fEH6t5i9GmM33dLjXZ-UCu5eImAWytHLdgTrziLgfgfQhrLKpwUTQ0PdgudNsihhjcH9tX5dlMQ13TjXoCFGmk61l8Pwc7ujvaspN=s0-d-e1-ft#https://aadcdn.msauthimages.net/c1c6b6c8-g3jtvm5vyqmfvzjk3j7nzjkambalumjwqmwviufjtqi/logintenantbranding/0/bannerlogo?ts=637880369843485311" class="CToWUd">
                           </td>
</tr>
</tbody></table>


               </td>

               <td width="29" style="border-bottom:1px solid #e3e3e3">&nbsp;</td>
               <td width="1" style="background:#e3e3e3;border-bottom:1px solid #e3e3e3"></td>
           </tr>
          </tbody></table>

       </td>
       <td valign="top" width="50%"></td>
   </tr>
</tbody></table>
        </br>
    </body>
    </html>`;
}