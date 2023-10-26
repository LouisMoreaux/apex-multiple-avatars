# apex-multiple-avatar
Oracle APEX - Multiple Avatar Template Component Plug-in

A template component useful to display a list of user's avatar.

![Screenshot showing the Multiple Avatars template component plug-in used as a single region to displays avatars with initials, icons or images and with and without limits](assets/preview2.png "Screenshot showing the Multiple Avatars template component plug-in")

![Screenshot showing the Multiple Avatars template component plug-in used as in interactive reports with initials, icons or images and with and without limits](assets/preview.png "Screenshot showing the Multiple Avatars template component plug-in")

## Installation
Import the file located at plug-in/template_component_plugin_apex_lmoreaux_multiple_avatars.sql

## configuration
<table>
<tr>
<td> Attribute </td> <td> Description </td>
</tr>
<tr>
<td> JSON Data </td>
<td> 
<p>Column containing a JSON array of object</p>

```json
[
   {
      "title": "John Doe",
      "initals": "JD",
      "picture": "https://example.com/john_doe.jpg",
      "page": 1,
      "items": "P1_ITEM1,P1_ITEM2",
      "values": "VALUE1,VALUE2",
      "cssClass": "u-color-1"
   },
   ...
]
```
Here is a SQL query:

```sql
select json_arrayagg(
          json_object(
             'title' value mt.full_name,
             'initials' value apex_string.get_initials(mt.full_name),
             'picture' value mt.picture_url,
             'page' value 1,
             'items' value 'P1_ITEM1,P1_ITEM2',
             'values' value mt.value1||','||mt.value2,
             'cssClass' value 'u-color-'
                              || ora_hash(mt.full_name, 45)
          )
       ) as json_data
  from my_table mt
 where rownum < 10
```
</tr>
<tr>
<td> Type </td>
<td> Choose if you want to display it as an image, an icon or with the initials. In case the url is wrong, the plug-in will try to use the initial as a fallback and if not provided in the JSON, it will use the default icon. </td>
</tr>
<tr>
<td> Size </td>
<td> Choose between the 3 available size: Small, Medium or Large </td>
</tr>
<tr>
<td> Default Color Class </td>
<td> See: <a href="https://apex.oracle.com/pls/apex/r/apex_pm/ut/color-and-status-modifiers" target="_blank">Universal Theme colors</a> </td>
</tr>
<tr>
<td> Default Icon </td>
<td> Default icon (used if not defined in the JSON data). </td>
</tr>
<tr>
<td> Limit </td>
<td> Specify the maximum of avatars to display. In case there is more, then the plug-in will display the number of additional avatars. </td>
</tr>
<tr>
<td> More Color Class </td>
<td> Default color class when more avatar is displayed see: <a href="https://apex.oracle.com/pls/apex/r/apex_pm/ut/color-and-status-modifiers" target="_blank">Universal Theme colors</a> </td>
</tr>
<tr>
<td> More Link </td>
<td> Link for the more avatar. </td>
</tr>
<tr>
<td> More Link Attributes </td>
<td> More avatar link attributes. </td>
</tr>
</table>

## Demo
A live demo can be found at [https://apex.oracle.com/pls/apex/r/louis/template-component/multipe-avatars](https://apex.oracle.com/pls/apex/r/louis/template-component/multipe-avatars)



