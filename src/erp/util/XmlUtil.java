package erp.util;


import java.io.StringWriter;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Result;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import erp.web.model.Role;

public class XmlUtil {
	private static DocumentBuilderFactory factory=DocumentBuilderFactory.newInstance();
	private static DocumentBuilder builder;
   public static Document init(){
	   Document document;
	   if(builder==null){
		   try {
			builder=factory.newDocumentBuilder();
		} catch (ParserConfigurationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	   }
	   document=builder.newDocument();
	   document.setXmlStandalone(true);
	   return document;
   }
   public static Element createElement(Document document,String name,String value){
	   Element el=document.createElement(name);
	   if(value!=null){
		   el.appendChild(document.createTextNode(value));
	   }
	   return el;
   }
   public static String getTextFromDocument(Node doc) {
	   DOMSource source=new DOMSource(doc);
	   StringWriter writer=new StringWriter();
	   Result resultStr =new StreamResult(writer);
	   String xmlStr = null;
	   try {
		Transformer transformer = TransformerFactory.newInstance().newTransformer();
		transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
		transformer.setOutputProperty(OutputKeys.INDENT, "yes");
		transformer.transform(source, resultStr);
		xmlStr = writer.getBuffer().toString();
	} catch (TransformerConfigurationException e) {
		// TODO Auto-generated ca tch block
		e.printStackTrace();
	} catch (TransformerFactoryConfigurationError e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}catch (TransformerException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	   return xmlStr;
   }
	public static String getCpSql(String module,String cp){
		   StringBuffer sql=new StringBuffer("in(select cp_table_key from content_permit ");
		   System.out.println(sql+"++++++++++++++++++++++++++++++++++++++++++++");
		   StringBuffer cp1=null;
		   StringBuffer where=new StringBuffer("where cp_module='"+module+"'");
		   if(cp!=null&&!cp.equals("all")){
			   cp1=new StringBuffer(cp+"='true'");
		   }
		   System.out.println(sql+"++++++++++++++++++++++++++++++++++++++++++++");
		   List<Role> userrole=SessionUtil.getCurrentUserRoles();
		   if(userrole.size()>0){
			   where.append(" and (tar_type='R'");
		   }	
		   System.out.println(sql+"++++++++++++++++++++++++++++++++++++++++++++");
		   for(Role item:userrole){
			   if(userrole.indexOf(item)==0){
				   where.append("and tar_id="+item.getRole_id());
			   }else{
				   where.append("or tar_id="+item.getRole_id());
			   }
			   if(userrole.indexOf(item)==userrole.size()-1){
				   where.append(")");
			   }
		   }
		   System.out.println(sql+"++++++++++++++++++++++++++++++++++++++++++++");
		   String login_id=SessionUtil.getCurrentUser().getLogin_id();
		   if(!login_id.equals("")&&login_id!=null){
			   where.append("or (tar_type='U' and tar_id='"+login_id+"')");
		   }
//		   List<EmpPosition> pst=SessionUtil.getPstList();
//		   if(pst.size()>0){
//			   where.append(" or (tar_type='P'");
//		   }
//		   for(EmpPosition item:pst){
//			   if(pst.indexOf(item)==0){
//				   where.append("and tar_id='"+item.getPst_code()+"'");
//			   }else{
//				   where.append("or tar_id="+item.getPst_code()+"'");
//			   }
//			   if(pst.indexOf(item)==pst.size()-1){
//				   where.append(")");
//			   }   
//		   }
//		   System.out.println(sql+"++++++++++++++++++++++++++++++++++++++++++++");
//		   OrgTreeNode org = SessionUtil.getCurrentOrgUnit();
//		   if(org!=null){
//			   System.out.println(sql+"++++++++++++++++++++++++++++++++++++++++++++");
//			   where.append("or(tar_type='O' and tar_id="+org.getOu_id()+")");
//		   }
		   sql.append(where);
		   sql.append(")");
		  
		   return sql.toString();
	   }
	   public static boolean isMatch(String content,String regx){
		   boolean flag=false;
		   Pattern pattern=Pattern.compile(regx);
		   Matcher m=pattern.matcher(content);
		   flag= m.find();
		   return flag;
	   }
	   public static String addTableName(String sql){
		   String[] sqlParts=null;
		   String[] tables=null;
		   sqlParts=sql.toLowerCase().split("from");
		   tables=sqlParts[1].split(",");
		  return sqlParts[0]+","+tables[0]+" as tbl_name "+sqlParts[1];
	   }
}
