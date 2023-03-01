import * as cdk from "aws-cdk-lib";
import { Stack } from "aws-cdk-lib";
import * as rds from "aws-cdk-lib/aws-rds";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const defaultVpc = ec2.Vpc.fromLookup(this, "DefaultVpc", {
      isDefault: true,
    });

    // const publicSubnets = defaultVpc.selectSubnets({
    //   subnetType: ec2.SubnetType.PUBLIC,
    // });

    new rds.DatabaseInstance(this, "MWP", {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_14_6,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      vpc: defaultVpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      allocatedStorage: 10,
      credentials: rds.Credentials.fromUsername("MyWordPal", {
        password: cdk.SecretValue.secretsManager("mydbsecret", {
          jsonField: "MyWordPalPassword",
        }),
      }),
      publiclyAccessible: true,
      port: 5432,
      databaseName: "mwpdata",
    });
  }
}

const app = new cdk.App();

new MyStack(app, "MyStack", {
  env: {
    account: "515945845327",
    region: "ap-south-1",
  },
});

app.synth();
