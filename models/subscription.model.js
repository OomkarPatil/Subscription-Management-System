import mongoose  from "mongoose";

const subscriptionSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Subscription name is required"],
        trim:true,
        minLength: 5,
        maxLength: 100,
    },
    price:{
        type:Number,
        required:[true, "Subscription price is required"],
        min:[0,"Price must be greater than 0"]
    },
    currency:{
        type:String,
        enum: ["EUR","USD","INR"],
        default: "INR"
    },
    frequency:{
        type:String,
        enum:["daily","weekly","monthly","yearly"],
    },
    category:{
        type:String,
        enum:["sports","Entertainment","LifeStyle","Technology","Gaming","News","Others"],
        required:[true, "Subscription category is required"],
    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true,
    },
    status:{
        type:String,
        enum:["active","Cancelled","Expired"],
        default:"active"
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator:(value)=> value <= new Date(),
            message:"Start date must be in the Past"
        }
    },
    renewalDate:{
        type:Date,
        validate:{
            validator: function (value){
                return value > this.startDate;
            },
            message:"Renewal Date must be after start date"
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    }

},{timestamps:true});


//auto-Calculate the renewal date if missing
subscriptionSchema.pre("save", function(next){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    //autoupdate the status if the renewaldate has passed
    if(this.renewalDate < new Date()){
        this.status = "Expired";
    }

    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;