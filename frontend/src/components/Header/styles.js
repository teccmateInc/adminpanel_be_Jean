import { makeStyles } from "@material-ui/core/styles";
import { display } from "@mui/system";

let useStyle = makeStyles((theme)=>({
    root:{
        width:"100vw",
        position:"absolute",
        maxWidth:"100%",
        display:"flex",
        justifyContent:"space-between"

    },
    header:{
        marginRight: `${theme.spacing(3)}px !important`,
        textAlign: 'center',
        color: theme.palette.secondary,
    }
},{
    lastitem:{
        display: "flex",
        justifyContent: "flex-end", 
        textAlign: 'center',
        color: theme.palette.secondary,
    }
})
)

export default useStyle