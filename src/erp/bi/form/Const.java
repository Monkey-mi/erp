package erp.bi.form;

public interface Const {
		//动态SQL相关
		public static final String WORK_SHEET   ="WorkSheet";           //工作表
		public static final String SHEET_NAME	="SheetName";			//工作表名
		public static final String DELETE_DATA 	="DELETE_DATA";			//删除数据
		public static final String INSERT_DATA 	="INSERT_DATA";			//插入数据
		public static final String UPDATE_DATA 	="UPDATE_DATA";			//更新数据
		public static final String SELECT_DATA 	="SELECT_DATA";			//查询数据
		public static final String FRMATTR_DATA 	="FRMATTR_DATA";		//附件数据
		public static final String QUERY_SQL = "QUERY_SQL"; 		//查询SQL
		public static final String IS_PROVIEW = "IS_PROVIEW";       //是否预执行
		public static final String DATA_FIELDS = "DATA_FIELDS";	//查询结果字段定义
		public static final String DATA_ROWS   = "DATA_ROWS";       //查询结果数据行
		public static final String DATA_ROWNUM = "row_num";       //查询结果数据行号
		public static final String DS_TYPE = "ds_type";       //数据源类型
		public static final String DS_TYPE_SINGLE = "SINGLE";       //单SQL数据源
		public static final String DS_TYPE_DSCENTER = "DS_CENTER";       //多SQL数据源
		
		public static final String TABLE_DEFINE     ="TABLE_DEFINE";          //数据表定义
		
		
		public static final String TABLE_PREFIX 	="t_userdefine_";			//表名前缀
		public static final String TABLE_NAME 		="TABLE_NAME";	//表名
		public static final String TABLE_FIELDS		="TABLE_FIELDS";//字段 列表
		public static final String TABLE_FIELDS2		="TABLE_FIELDS2";//字段 列表
		public static final String TABLE_DATA		="TABLE_DATA";		//数据 列表
		public static final String DATASOURCE_CODE ="DATASOURCE_CODE";//数据源代码
		public static final String KEY_FIELDCODE	="pk_id";			//默认主键
		public static final String KEY_FIELDNAME	="默认主键";			//默认主键字段名
		public static final String KEY_FIELDTYPE    ="int";	//默认主键字段类型
		public static final String FKEY_FIELDCODE	="fk_id";			//默认外键
		public static final String FKEY_FIELDNAME	="默认外键";			//默认外键字段名
		public static final String FKEY_FIELDTYPE	="int";		//默认外键字段类型
		
		//自定义单据表类别
		public static final String FRMTBL_TYPE		=   "FRMTBL_TYPE";       //数据表类别
		public static final String FRMTBL_TYPE_MASTER	=	"MASTER"; //主表
		public static final String FRMTBL_TYPE_DETAIL	=	"DETAIL"; //从表
		public static final String FRMTBL_FROM_TYPE_EXISTS =	"exists";  //数据表来源-已存在表
		public static final String FRMTBL_FROM_TYPE_USERDEFINE = "userdefine"; //数据表来源-用户自定义
		public static final String FRMTBL_FROM_TYPE_EXTDATASOURCE = "ext_datasource"; //数据表来源-外部数据源
		//字段模板类别
		public static final String FLDTPL_TYPE	=	"FLDTPL_TYPE"; //主表
		public static final String FLDTPL_TYPE_FIXED	=	"FLDTPL_TYPE_FIXED"; //固定字段
		public static final String FLDTPL_TYPE_PRESET	=	"FLDTPL_TYPE_PRESET"; //预设字段
		
		
		public static final String ROW_NUMBER		="rowNumber";		//客户端的行号
		public static final String FIELD_CODE		="FIELD_CODE";		//字段名称
		public static final String FIELD_DATATYPE	="FIELD_DATATYPE";	//字段的数据类型
		public static final String FIELD_ATTR		="FIELD_ATTR";		//字段的其他属性
		public static final String FIELD_VALUE		="FIELD_VALUE";		//字段值
		public static final String WHERE_STR 		="WHERE_STR";		//where串
		public static final String WHERE_CONDITIONS ="WHERE_CONDITIONS";//where条件 列表
		public static final String WHERE_JOIN 		="WHERE_JOIN";		//条件连接  and、or 等
		public static final String WHERE_FIELD 		="WHERE_FIELD";		//条件字段
		public static final String WHERE_OPR 		="WHERE_OPR";		//条件操作符  =、<、>等等
		public static final String WHERE_VALUE 		="WHERE_VALUE";		//条件值
		
		public static final String DATA_TYPE_STRING 			  ="varchar";			//文本
		public static final String DATA_TYPE_STRING_MYSQL 	  ="varchar";		//MYSQL文本
		public static final String DATA_TYPE_STRING_MSSQLSERVER ="nvarchar";	//MSSQLSERVER文本
		public static final String DATA_TYPE_STRING_ORACLE      ="nvarchar2";		//ORACLE文本
		public static final String DATA_TYPE_INTEGER	="integer";			//数字
		public static final String DATA_TYPE_DEC		="decimal";			//数值
		public static final String DATA_TYPE_DATE 	="date";			//日期
		public static final String DATA_TYPE_DATETIME ="datetime";		//日期时间
		public static final String DATA_TYPE_TIME		="timestamp";		//时间
		public static final String DATA_TYPE_LONGTEXT 		="longtext";  //大文本
		public static final String DATA_TYPE_LONGTEXT_MYSQL	="longtext";  //mysql大文本
		public static final String DATA_TYPE_LONGTEXT_MSSQLSERVER	="nvarchar(Max)";  //mssqlserver大文本
		public static final String DATA_TYPE_LONGTEXT_ORACLE	="clob";  //oracle大文本
		
		public static final String DATA_TYPE_BOOL = "boolean"; //布尔值
		public static final String DATA_TYPE_NOTSUPPORT ="notsupport";   //不支持的

}
