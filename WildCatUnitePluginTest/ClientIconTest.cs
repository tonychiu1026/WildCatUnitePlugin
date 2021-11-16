using System;
using System.Reflection;
using AutoFixture;
using AutoFixture.AutoMoq;
using AutoFixture.Idioms;
using FluentAssertions;
using Moq;
using WildCatUnitePlugin;
using Xunit;
using Intel.Unite.Common;
using Intel.Unite.Common.Module.Feature.Hub;
using Intel.Unite.Common.Context;
using Intel.Unite.Common.Core;
using Intel.Unite.Common.Command;
using Intel.Unite.Common.Module.Common;
using Intel.Unite.Common.Context.Hub;
using Intel.Unite.Common.Command.Serialize;
using Intel.Unite.Common.Context.Client;
using Intel.Unite.Common.Module.Feature.Client;
using WildCatUnitePlugin.UI;
using System.Windows.Controls;

namespace PluginModuleHandlerTest
{
    public class ClientIconTest
    {
        private readonly Type _sutType = typeof(ClientIcon);
        private readonly IFixture _fixture;

        public ClientIconTest()
        {
            _fixture = new Fixture().Customize(new AutoMoqCustomization());
        }

        #region Ctor
        
        [Trait("Category", "Unit")]
        [Fact]
        public void Sut_Type_ImplementsInterface()
        {
            // Given
            // When
            // Then
            _sutType.Should().BeAssignableTo<UserControl>();
        }

        #endregion Ctor
        /*
        [Trait("Category", "Unit")]
        [Fact]
  
        public void UserInfo_UserConnected_MessageSent()//you can run the tests in debug mode and step through the calls..
        {
            // Given
            var runtimeContext = _fixture.Freeze<Mock<IClientModuleRuntimeContext>>();
            var userInfo = _fixture.Create<UserInfo>();
            var sut = new PluginModuleHandler(runtimeContext.Object);
            sut.RuntimeContext = runtimeContext.Object;
            // create the msg here
            var expectedMessage = new Message()
            {
                DataType = 0,
            };
            Message testMessage = null;
            runtimeContext.Setup(mock => mock.MessageSender.TrySendMessage(It.IsAny<Message>()))
                .Callback<Message>(message =>
                {
                    testMessage = message;
                });
            // When
            sut.UserConnected(userInfo);
            // Then
            runtimeContext.Verify(v => v.MessageSender.TrySendMessage(It.IsAny<Message>()), Times.Once);
            expectedMessage.DataType.Should().Be(testMessage.DataType);
            var messagedata = new JsonCommandSerializer().Deserialize<WildCatAuthenicationEventArgs>(testMessage.Data);
            var testdata = new WildCatAuthenicationEventArgs("username", "");
            messagedata.Should().BeEquivalentTo(testdata);
        }
        */

        [Trait("Category", "Unit")]
        [Fact]
        public void Manifest_ManifestfileGet_Correctfiles()//you can run the tests in debug mode and step through the calls..
        {
            // Given
            var sut = _fixture.Create<ClientIcon>();

            // When
            sut.QuickAccessButton_Click(null, null);
            // Then
        }
    }
}
